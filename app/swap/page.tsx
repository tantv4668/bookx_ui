'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const View = dynamic(() => import('./view'), { ssr: false });

const LifiPage: React.FC = () => {
	return <View />;
};

export default LifiPage;
