import cuid from 'cuid';

export const tocLess = (html) => `
  <div class="container">
    <div class="row">
      <div class="bootmark-main">
        ${html}
      </div>
    </div>
  </div>
`;

export const toc = (html, config) => {
  const containerId = cuid();
  const tocId = cuid();

  return `
    <div class="container-fluid" id="${containerId}">
      <div class="row">
        <div class="col-sm-3 col-md-3 col-lg-2">
          <nav class="navbar navbar-default navbar-fixed-side">
            <div class="container-fluid">
              <div class="navbar-header">
                <button class="navbar-toggle" data-target="#${tocId}" data-toggle="collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand active page-scroll" href="#${containerId}">
                  ${config.tocTitle}
                </a>
              </div>
              <div class="collapse navbar-collapse" id="${tocId}">
                <ul class="bootmark-toc nav navbar-nav"></ul>
              </div>
            </div>
          </nav>
        </div>
        <div class="bootmark-main has-toc col-sm-9 col-md-9 col-lg-10">
          ${html}
        </div>
      </div>
    </div>
  `;
};