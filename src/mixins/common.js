export default {
  methods: {
    getFormattedDate (rawDate) {
      const date = new Date(rawDate)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  }
}
