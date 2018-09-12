import { Subject } from "rxjs";

export default {
  name: "overlay",
  components: {},
  props: {
    ghost: { default: false },
    noActions: { default: false },
    cancelButton: { default: "Annuler" },
    validateButton: { default: "Valider" },
    width: { default: null },
    height: { default: null },
    title: { default: undefined },
    body: { default: undefined },
    form: { default: undefined },
    direction: {default: "right"},
  },
  data() {
    return {
      isOpen: false,
      state: "close",
      result: null,
      context: {},
      openEvent: new Subject()
    };
  },
  computed: {},
  mounted() {},
  methods: {
    close($event) {
      if ($event) {
        $event.stopPropagation();
      }
      this.isOpen = false;
      this.state = "close";
      setTimeout(() => this.$emit("visibleChange", this.isOpen));
      if (this.result) {
        this.result.unsubscribe();
        this.result = null;
      }
    },
    open(context) {
      this.context = context;
      this.result = new Subject();
      this.isOpen = true;
      this.state = "open";
      setTimeout(() => {
        this.$emit("visibleChange", this.isOpen);
        this.openEvent.next();
      });
      return this.result;
    },
    stopPropagation($event) {
      $event.stopPropagation();
    },
    out(isValidate, value) {
      if (!isValidate) this.result.next(null);
      else if (this.form) this.result.next(this.form.value);
      else this.result.next(value || "ok");
      this.close();
    },
    bindForm(form) {
      this.form = form;
      return this;
    }
  }
};
