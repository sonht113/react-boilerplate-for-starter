import { FC } from 'react';

import { Toaster } from 'react-hot-toast';

type Props = {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  reverseOrder?: boolean;
};

export const ToasterConfig: FC<Props> = ({
  position = 'top-center',
  reverseOrder = false,
}) => {
  return <Toaster position={position} reverseOrder={reverseOrder} />;
};
