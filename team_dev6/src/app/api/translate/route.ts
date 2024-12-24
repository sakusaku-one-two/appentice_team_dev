import { NextRequest, NextResponse } from 'next/server';
import { Translator } from 'deepl-node';

// 環境変数を使用する場合
const authKey = "6bd0c0b1-1b3a-4b97-a85e-0560b63f05bb:fx";
const translator = new Translator(authKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, targetLang } = body;

    // 翻訳処理
    const result = await translator.translateText(text, null, targetLang);

    // 結果が単一か配列かを判定
    const translatedText = Array.isArray(result)
      ? result[0].text // 配列の場合
      : result.text;   // 単一結果の場合

    return NextResponse.json({ text: translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
