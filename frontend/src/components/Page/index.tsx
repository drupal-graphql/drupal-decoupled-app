import React, { StatelessComponent } from 'react';
import styles from './styles.css';

export interface IPageFragment {
  __typename: string;
  title: string;
  body: {
    __typename: string;
    text: string;
  };
}

// tslint:disable-next-line:no-empty-interface
export interface IPageProps extends IPageFragment {}

const Page: StatelessComponent<IPageProps> = ({ title, body }) => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: body && body.text }} />
  </div>
);

export default Page;
