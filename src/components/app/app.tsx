import { Component } from '@stencil/core';

const Footer = () => (
  <footer class="hero is-info">
    <div class="hero-body">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <a href="https://obedm503.github.io/bootmark">
              This project uses bootmark. Bootmark allows developers to focus on
              their projects and not how they are presented.
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

@Component({
  tag: 'boot-mark-app',
  shadow: false,
  styleUrl: 'app.css',
})
export class BootMarkApp {
  render() {
    const main = (
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <aside class="menu">
              <p class="menu-label">Menu label</p>
              <ul class="menu-list">
                <li>
                  <a>item 1</a>
                </li>
                <li>
                  <a>item 2</a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column is-10">
            <main>
              <slot />
            </main>
          </div>
        </div>
      </div>
    );
    return [main, <Footer />];
  }
}
