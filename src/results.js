const template = document.createElement('template');
template.innerHTML = `
  <style>
    .btn {
      cursor: pointer;
      display: inline-block;
      font-weight: 400;
      color: #212529;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      background-color: transparent;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    
    .btn:hover {
      color: #212529;
      text-decoration: none;
    }

    .btn-primary {
      color: #000;
      background-color: #fff;
      border-color: #007bff;
    }

    .btn-primary:hover {
      border-color: #0062cc;
    }

    .btn-primary:focus {
      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
    }

    .btn-lg {
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      line-height: 1.5;
      border-radius: 0.3rem;
      padding: 20px 22px;
    }

    .centralize {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  </style>

  <div class="centralize">
    <section>
      <h1>Final Results</h1>
      <p>Maybe you answered, maybe not this</p>
    </section>
    <!-- <button type="button" class="btn btn-primary btn-lg">Pass Again</button> -->
  </div>
`;

class Results extends HTMLElement {
  get correctAnswers() {
    return this.getAttribute('correct-answers');
  }

  get totalAnswers() {
    return this.getAttribute('total-answers');
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const paragraph = this.shadow.querySelector('p');
    const percentage = (this.correctAnswers / this.totalAnswers) * 100;
    paragraph.textContent = `You correctly answered ${this.correctAnswers}  of ${this.totalAnswers} questions (${percentage}%)`;
  }
}

export default Results;
