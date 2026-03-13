class UserBadge extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name");
    this.innerHTML = `
      <div style="
        padding:10px;
        border:1px solid #ccc;
        border-radius:8px;
        display:inline-block;
        background:#f5f5f5;
      ">
        ${name}
      </div>
    `;
  };
};

customElements.define("user-badge", UserBadge);