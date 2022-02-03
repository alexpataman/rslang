import { useMemo, useEffect, useState } from 'react';

import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { Word } from '../../../types/RSLangApi';

export const TextbookPage = () => {
  const [words, setWords] = useState<Word[]>();
  const wordsApi = useMemo(() => new WordsApi(), []);

  useEffect(() => {
    (async () => {
      const words = await wordsApi.getWords();
      setWords(words);
    })();
  }, [wordsApi]);

  return (
    <>
      <div>Textbook Page</div>
      <ul>
        {words?.map((el) => (
          <li key={el.id}>
            {el.word} - {el.wordTranslate}
          </li>
        ))}
      </ul>
    </>
  );
};
