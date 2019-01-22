const template = document.createElement('template');
template.innerHTML = `
  <style>
    img {
      display: block;
    }
    input {
      margin-right: 12px;
    }
    .answer:before {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      content: "";
    }
    .answer::after {
      content: "";
      position: absolute;
      top: calc(50% - 12px);
      left: calc(50% - 12px);
      background-color: white;
      width: 24px;
      height: 24px;
      transform: scale(4);
    }

    .answer_correct:before {
      background: rgba(63, 195, 128, .7);
    }
    .answer_correct:after {
      mask: url(./icons/icons8-ok.svg);
    }
    .answer_wrong:before {
      background: rgba(240, 52, 52, .7);
    }
    .answer_wrong:after {
      mask: url(./icons/icons8-cancel.svg);
    }
    .btn_secondary {
      border: 1px solid black;
      background: none;
      padding: 7px 25px;
      cursor: pointer;
    }
    .fieldset {
      position: relative;
      margin: 0;
      border: 1px solid black;
    }
    .m-top-15 {
      margin-top: 15px;
    }
    .m-bottom-5 {
      margin-bottom: 5px;
    }
    .scrolling-wrapper {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      width: calc(100vw - (15px + 12px + 1px) * 2);
    }

    @media (min-width: 576px) {
      .scrolling-wrapper {
        max-width: calc(540px - (15px + 12px + 1px) * 2);
      }
    }

    @media (min-width: 768px) {
      .scrolling-wrapper {
        max-width: calc(720px - (15px + 12px + 1px) * 2);
      }
    }

    @media (min-width: 992px) {
      .scrolling-wrapper {
        max-width: calc(960px - (15px + 12px + 1px) * 2);
      }
    }

    @media (min-width: 1200px) {
      .scrolling-wrapper {
        max-width: calc(1140px - (15px + 12px + 1px) * 2);
      }
    }
  </style>

  <form class="m-top-15">
    <fieldset class="fieldset m-bottom-5">
      <legend></legend>
    </fieldset>
    <button type="button" class="btn_secondary">Answer</button>
  </form>
`;

class Question extends HTMLElement {
  get question() {
    return JSON.parse(this.getAttribute('question'));
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  static createImage(src, width, height, alt) {
    const image = document.createElement('img');
    return Object.assign(image, {
      width,
      height,
      src,
      alt,
    });
  }

  static createInput(type, name, value, id) {
    const input = document.createElement('input');
    return Object.assign(input, {
      type,
      name,
      value,
      id,
    });
  }

  static createLabel(textContent, htmlFor) {
    const label = document.createElement('label');
    return Object.assign(label, {
      textContent,
      htmlFor,
    });
  }

  static createRadioGroup(radioGroup, name) {
    return radioGroup.flatMap(radio => [
      this.createInput('radio', name, radio.id, radio.id),
      this.createLabel(radio.name, radio.id),
      document.createElement('br'),
    ]);
  }

  static get observedAttributes() {
    return ['question', 'correctness'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'correctness') {
      if (newValue === 'true') {
        this.fieldset.classList.add('answer', 'answer_correct');
        window.setTimeout(() => {
          this.fieldset.classList.remove('answer', 'answer_correct');
        }, 500);
      } else if (newValue === 'false') {
        this.fieldset.classList.add('answer', 'answer_wrong');
        window.setTimeout(() => {
          this.fieldset.classList.remove('answer', 'answer_wrong');
        }, 500);
      }
    }

    if (attr === 'question' && oldValue !== newValue) {
      this.fieldset = this.shadow.querySelector('fieldset');

      this.legend = this.shadow.querySelector('legend');
      this.legend.textContent = this.question.question;

      // Remove all fieldset childs except legend
      while (this.fieldset.lastChild && this.fieldset.lastChild !== this.legend) {
        this.fieldset.lastChild.remove();
      }

      if (this.question.image) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('scrolling-wrapper');
        const image = this.constructor.createImage(this.question.image, 560, 410, 'Some Front-end related code');
        this.fieldset.appendChild(imageContainer);
        imageContainer.appendChild(image);
      }

      this.constructor
        .createRadioGroup(this.question.possibleOptions, this.question.id)
        .forEach((el) => {
          this.fieldset.appendChild(el);
        });
    }
  }
}

export default Question;
