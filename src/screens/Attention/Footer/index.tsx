import React, { FC } from 'react';

import { Footer, IFooterProps } from '../../../components';

interface IAttentionFooter {
  result: IFooterProps['result'];
}

export const AttentionFooter: FC<IAttentionFooter> = ({ result }) => {
  return <Footer result={result} />;
};
