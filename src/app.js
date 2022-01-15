const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'N023ZD02SD',
  '074213c2eca781821544c2976e192751'
);

const search = instantsearch({
  indexName: 'nba_teams',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
      <div>
        <center><img src="{{logoUrl}}" alt="{{name}}" style="width:150px; height:150px; padding-bottom: 15px;", align="middle"></center>
        <article>
          <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
        </article>
          <div class="hit-description", style="padding-top: 5px;">
            {{#helpers.highlight}}{ "attribute": "location" }{{/helpers.highlight}}
          </div>
          <div class="hit-score", style="padding-top: 5px;">{{score}}</div>
      </div>
      `,
    },
  }),
  instantsearch.widgets.configure({
    facets: ['*'],
    maxValuesPerFacet: 20,
  }),
     instantsearch.widgets.rangeSlider({
    container: '#range',
    attribute: 'score',
    min: 0,
  }),
  instantsearch.widgets.dynamicWidgets({
    container: '#dynamic-widgets',
    
    widgets: [
      (container) =>
        instantsearch.widgets.refinementList({
          container,
          attribute: 'location',
          showMore: true,
        sortBy: ['name:asc'],
        showMoreLimit: 45
        }),
    ],
  }),
  instantsearch.widgets.pagination({
    container: '#pagination'
  }),
]);

search.start();
