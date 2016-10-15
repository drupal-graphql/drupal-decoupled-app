// @flow

export type HomeScreenProps = {
  articles: [{
    node: {
      id: string,
      title: string,
      body: ?string,
    }
  }]
};
