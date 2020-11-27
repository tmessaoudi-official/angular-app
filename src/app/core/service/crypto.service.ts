import { Injectable } from '@angular/core';
import { AES, SHA512, enc } from 'crypto-js';

@Injectable({
	providedIn: `root`
})
export class CryptoService {
	encrypt(data: string): string {
		return AES.encrypt(
			data,
			SHA512(`my very long secret used to encrypt data`).toString(
				enc.Base64
			)
		).toString();
	}
	decrypt(data: string): string {
		return AES.decrypt(
			data,
			SHA512(`my very long secret used to encrypt data`).toString(
				enc.Base64
			)
		).toString(enc.Utf8);
	}
}
