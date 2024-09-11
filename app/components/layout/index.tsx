'use client';
import Split from '@uiw/react-split';
import { BaseLayout } from './baseLayout';
import { Header } from './header';
import { Footer } from './footer';
import { Content } from './content';
import { Sider } from './sider';
import { PageHeader } from './pageHeader';

export * from '../layout/paper';
export { Page } from './pageLayout';

type Layout = typeof BaseLayout & {
	Header: typeof Header;
	Footer: typeof Footer;
	Content: typeof Content;
	Sider: typeof Sider;
	Split: typeof Split;
	PageHeader: typeof PageHeader;
};

const Layout = BaseLayout as Layout;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Split = Split;
Layout.PageHeader = PageHeader;

export { Layout };
