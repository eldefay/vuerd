import { html, customElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { repeat } from "lit-html/directives/repeat";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { Subscription, fromEvent } from "rxjs";
import { EditorElement } from "@src/components/EditorElement";
import { Logger } from "@src/core/Logger";
import { databaseHints, DataTypeHint } from "@src/core/DataType";
import { markToHTML } from "@src/core/Helper";
import { FlipAnimation } from "@src/core/Animation";
import { Bus } from "@src/core/Event";
import { changeColumnDataType } from "@src/core/command/column";

interface Hint {
  name: string;
  html: string;
  active: boolean;
}

@customElement("vuerd-column-data-type-hint")
class ColumnDataTypeHint extends EditorElement {
  @property({ type: String })
  value = "";
  @property({ type: Array })
  hints: Hint[] = [];

  tableId!: string;
  columnId!: string;

  private startFilter = true;
  private flipAnimation = new FlipAnimation(
    this.renderRoot,
    ".vuerd-data-type-hint",
    "vuerd-data-type-hint-move"
  );

  get dataTypeHints() {
    const { canvasState } = this.context.store;
    let dataTypeHints: DataTypeHint[] = [];
    for (const databaseHint of databaseHints) {
      if (databaseHint.database === canvasState.database) {
        dataTypeHints = databaseHint.dataTypeHints;
        break;
      }
    }
    return dataTypeHints;
  }

  get activeIndex(): number | null {
    let index: number | null = null;
    for (let i = 0; i < this.hints.length; i++) {
      if (this.hints[i].active) {
        index = i;
        break;
      }
    }
    return index;
  }

  connectedCallback() {
    super.connectedCallback();
    const { eventBus } = this.context;
    const root = this.getRootNode() as ShadowRoot;
    const editor = root.querySelector(".vuerd-editor") as Element;
    this.hintFilter();
    this.subscriptionList.push(
      fromEvent<MouseEvent>(editor, "mousedown").subscribe(this.onMousedown),
      eventBus.on(Bus.ColumnDataTypeHint.arrowUp).subscribe(this.onArrowUp),
      eventBus.on(Bus.ColumnDataTypeHint.arrowDown).subscribe(this.onArrowDown),
      eventBus.on(Bus.ColumnDataTypeHint.arrowLeft).subscribe(this.onArrowLeft),
      eventBus
        .on(Bus.ColumnDataTypeHint.arrowRight)
        .subscribe(this.onArrowRight),
      eventBus
        .on(Bus.ColumnDataTypeHint.startFilter)
        .subscribe(this.onStartFilter)
    );
  }
  updated(changedProperties: any) {
    changedProperties.forEach((oldValue: any, propName: string) => {
      switch (propName) {
        case "value":
          this.flipAnimation.snapshot();
          this.hintFilter();
          break;
        case "hints":
          this.flipAnimation.play();
          break;
      }
    });
  }

  render() {
    return html`
      <ul class="vuerd-column-data-type-hint">
        ${repeat(
          this.hints,
          (hint) => hint.name,
          (hint) => {
            return html`
              <li
                class=${classMap({
                  "vuerd-data-type-hint": true,
                  active: hint.active,
                })}
                @click=${() => this.onSelectHint(hint)}
              >
                ${unsafeHTML(hint.html)}
              </li>
            `;
          }
        )}
      </ul>
    `;
  }

  private onArrowUp = (event: CustomEvent) => {
    if (this.hints.length !== 0) {
      event.detail.preventDefault();
    }
    const index = this.activeIndex;
    if (index !== null && index !== 0) {
      this.hints[index].active = false;
      this.hints[index - 1].active = true;
      this.requestUpdate();
    } else if (this.hints.length !== 0) {
      if (index === 0) {
        this.hints[index].active = false;
      }
      this.hints[this.hints.length - 1].active = true;
      this.requestUpdate();
    }
  };
  private onArrowDown = (event: CustomEvent) => {
    if (this.hints.length !== 0) {
      event.detail.preventDefault();
    }
    const index = this.activeIndex;
    if (index !== null && index !== this.hints.length - 1) {
      this.hints[index].active = false;
      this.hints[index + 1].active = true;
      this.requestUpdate();
    } else if (this.hints.length !== 0) {
      if (index === this.hints.length - 1) {
        this.hints[index].active = false;
      }
      this.hints[0].active = true;
      this.requestUpdate();
    }
  };
  private onArrowLeft = (event: CustomEvent) => {
    this.activeEnd();
    this.requestUpdate();
  };
  private onArrowRight = (event: CustomEvent) => {
    const index = this.activeIndex;
    if (index !== null) {
      event.detail.preventDefault();
      this.startFilter = false;
      const { store, helper } = this.context;
      store.dispatch(
        changeColumnDataType(
          helper,
          this.tableId,
          this.columnId,
          this.hints[index].name
        )
      );
    }
  };
  private onStartFilter = (event: CustomEvent) => {
    this.startFilter = true;
  };
  private onMousedown = (event: MouseEvent) => {
    const el = event.target as HTMLElement;
    if (!el.closest(".vuerd-column-data-type")) {
      this.dispatchEvent(new Event("blur"));
    }
  };

  private onSelectHint(hint: Hint) {
    const { store, helper } = this.context;
    this.startFilter = false;
    this.activeEnd();
    store.dispatch(
      changeColumnDataType(helper, this.tableId, this.columnId, hint.name)
    );
  }

  private hintFilter() {
    if (this.startFilter) {
      if (this.value.trim() === "") {
        this.hints = this.dataTypeHints.map((dataTypeHint) => {
          return {
            name: dataTypeHint.name,
            html: dataTypeHint.name,
            active: false,
          };
        });
      } else {
        this.hints = this.dataTypeHints
          .filter(
            (dataTypeHint) =>
              dataTypeHint.name
                .toLowerCase()
                .indexOf(this.value.toLowerCase()) !== -1
          )
          .map((dataTypeHint) => {
            return {
              name: dataTypeHint.name,
              html: markToHTML("vuerd-mark", dataTypeHint.name, this.value),
              active: false,
            };
          });
      }
    }
  }
  private activeEnd() {
    this.hints.forEach((hint) => (hint.active = false));
  }
}
