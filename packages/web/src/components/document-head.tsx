import { Helmet } from 'react-helmet';

export interface DocumentHeadProps {
  title?: string;
  description?: string;
}

export const DocumentHead = (props: DocumentHeadProps) => {
  const { title, description } = props;

  const docTitle = title ? `${title} | ` : '';
  const fullTitle = `${docTitle}Usufruct`;
  const desc = description ?? 'Lending libraries';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
    </Helmet>
  );
};
