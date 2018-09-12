import popup from "../../lib/popup/popup";
export default {
  name: 'home',
  components: {popup},
  props: [],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    openPopup() {
      this.$refs.popup.open()
    },
    add() {
      this.$notifs.add('Hay', 'lkdjelkdjedkjed')
    }
  }
}
