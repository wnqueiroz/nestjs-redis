import * as translate from '@vitalets/google-translate-api';

import { Injectable } from '@nestjs/common';

type TranslateParams = {
  text: string;
  to?: string;
};

@Injectable()
export class GoogleTranslateService {
  async translate(params: TranslateParams): Promise<string> {
    const { text, to = 'pt' } = params;

    return translate(text, { client: 'gtx', to }).then(
      (res: { text: string }) => res.text,
    );
  }
}
