import { Component } from '@stencil/core';


@Component({
  tag: 'boot-mark',
  styleUrl: 'boot-mark.scss',
  shadow: true,
})
export class Bootmark {
  render() {
    console.warn(this)
    return (
      <div>
        <slot></slot> + 5
      </div>
    );
  }
}