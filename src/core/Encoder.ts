import { Service } from 'typedi';

@Service()
export class Encoder {
    encode(data: string) {
        return btoa(data);
    }

    decode(data: string) {
        return atob(data);
    }
}