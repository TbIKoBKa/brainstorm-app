import React, { FC } from 'react';

import { Footer, IFooterProps } from '../../../components';

interface ICapsFooterProps {
  result: IFooterProps['result'];
}

export const CapsFooter: FC<ICapsFooterProps> = ({ result }) => {
  return <Footer result={result} />;
};
