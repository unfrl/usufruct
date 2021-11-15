import React from 'react';

import { rootStore } from '../stores';

const StoresContext = React.createContext(rootStore);

export const useStores = () => React.useContext(StoresContext);
