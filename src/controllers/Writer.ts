import { first, map } from 'rxjs';
import { ContainerInstance, Service } from 'typedi';
import { Encoder, OnInit, QueryParams, Router } from '../core';
import { UnknowElementError } from '../domain';
import { FORBIDDEN_FUNCTIONS_NAMES, mergeObjects, QueryParamsAnalyzer } from '../utils';

@Service()
export class Writer implements OnInit {
    private readonly router: Router;
    private readonly encoder: Encoder;
    private readonly queryParamsAnalyzer: QueryParamsAnalyzer;
    private readonly document: Document;
    private readonly form: HTMLFormElement;
    private textareas = new Array<HTMLTextAreaElement>();

    constructor(
        container: ContainerInstance
    ) {
        this.router = container.get(Router);
        this.encoder = container.get(Encoder);
        this.queryParamsAnalyzer = container.get(QueryParamsAnalyzer);
        const window = container.get(Window);

        this.document = window.document;
        const form = this.document.querySelector('form');
        if (!form) {
            throw new UnknowElementError()
        }
        this.form = form;
    }

    onInit() {
        this.router.queryParams$.pipe(
            first(),
            map(queryParams => this.queryParamsAnalyzer.getFiltredQueryParams(queryParams, (key) => !FORBIDDEN_FUNCTIONS_NAMES.includes(key))),
            map(queryParams => Object.keys(queryParams).length > 0 ? queryParams : { f: '' }),
        ).subscribe((queryParams) => {
            Object.keys(queryParams).forEach(key => {
                this.createFormulaField({ key, queryParams });
            });
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const queryParams = mergeObjects(this.textareas
                .sort((inputA, inputB) => inputA.name.localeCompare(inputB.name))
                .map(input => ({ [input.name]: this.encoder.encode(input.value) })));
            this.router.navigate(queryParams);
        });
    }

    private createFormulaField({ key, queryParams }: { key: string, queryParams: QueryParams }) {
        const div = this.document.createElement('div');
        const label = this.document.createElement('label');
        label.textContent = `${key}(x) = `;
        label.htmlFor = key;
        div.appendChild(label);
        const textarea = this.document.createElement("textarea");
        textarea.name = key;
        const value = queryParams[key]
        textarea.value = value;
        textarea.placeholder = 'Formula';
        textarea.rows = value.split('\n').length;
        textarea.addEventListener("keypress", (event) => {
            if (event.code === "Enter") {
                if (!event.shiftKey) {
                    event.preventDefault();
                    this.form.dispatchEvent(new SubmitEvent("submit"));
                }
            }
        });
        textarea.addEventListener('keyup', () => {
            const rows = textarea.value.split('\n').length;
            const difference = rows - textarea.rows;

            if (difference !== 0) {
                for (let i = 0; i < Math.abs(difference); ++i) {
                    if (difference > 0) {
                        textarea.rows++;
                        return;
                    }
                    textarea.rows--;
                }
            }
        });
        div.appendChild(textarea);
        this.textareas.push(textarea);
        this.form.prepend(div)
    }
}