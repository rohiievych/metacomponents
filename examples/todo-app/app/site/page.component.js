const bodyStyles = {
  font: `14px 'Helvetica Neue', Helvetica, Arial, sans-serif`,
  lineHeight: '1.4em',
  background: '#f5f5f5',
  color: '#111111',
  minWidth: '230px',
  maxWidth: '550px',
  margin: '0 auto',
  fontWeight: '300',
};

const createPage = (title, contentComponent) => [
  {
    path: '@app/site/head.component',
    input: title,
  },
  {
    tag: 'body',
    styles: bodyStyles,
    children: [
      contentComponent,
      { path: '@app/site/footer.component' },
    ],
  },
];

/** @returns {Schema} */
export default ({ locale }) => {
  console.time('Init');
  return {
    tag: 'html',
    styles: {
      fontFamily: 'Helvetica',
    },
    attrs: { lang: locale },
    hooks: {
      init() {
        console.timeEnd('Init');
      },
    },
    children: [
      {
        routes: [
          {
            pattern: '',
            component: createPage(
              'Todos',
              { path: '@todos/container.component' },
            ),
          },
          {
            pattern: [':id', 'todos/:id'],
            component: (params) => createPage(
              `Todo #${params.id}`,
              `Hey, this is todo '${params.id}'`,
            ),
          },
          {
            pattern: '**',
            component: createPage(
              '404',
              'Page not found',
            ),
          },
        ],
      },
    ],
  };
};