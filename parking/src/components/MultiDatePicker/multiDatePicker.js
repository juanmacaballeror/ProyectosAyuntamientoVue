
export default {
  name: 'mDatePicker',
  data() {
    return {
      panelShow: false,
      seleDate: new Date(),
      seleYear: new Date().getFullYear(),
      seleMonth: new Date().getMonth(),
    }
  },
  props: {
    multi:{
      type: Boolean,
      default: true,
    },
    value:{
      type: Array|String| Date,
      default: []
    },
    disp: {
      type: Array,
      default: function (){ return ['D', 'L', 'M', 'X', 'J', 'V', 'S','D', 'Mes', 'Limpiar', 'Aceptar']}
    },
  },
  computed: {
    renderCalendar: function () {
      debugger
      //let firDay = 0 - (new Date(this.seleYear, this.seleMonth, 1).getDay()) + 1
      let firDay = 1 - (new Date(this.seleYear, this.seleMonth, 1).getDay()) + 1
      let res = []
      for (let i = firDay, index = 0; index < 42; i++ , index++) {
        let day = new Date(this.seleYear, this.seleMonth, i, 8)
        let calObj = {
          label: day.getDate(),
          date: day,
          iscur: day.getMonth() === this.seleMonth
        }
        res.push(calObj)
      }
      return res
    },
    selected: function () { return this.value },
    display: function () {
      var d = this.disp
      return {
        days: d.slice(0,7),
        year: d[7],
        month: d[8],
        cancel: d[9],
        ok: d[10]
      }
    }
  },
  methods: {
    selectIndex: function (item) {
      if (!this.multi || !this.selected) {
        return -1
      }
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].getTime() == item.date.getTime()) {
          return i
        }
      }
      return -1
    },
    cancelSelect: function () {
      if (this.multi) {
        this.selected.splice(0, this.selected.length)
      } else {
        this.selected = null
      }
      this.panelShow = false
    },
    toggleSelect: function (item) {
      debugger
      if (!this.multi) {
        this.submitSelect(item.date)
      } else {
        let index = this.selectIndex(item)
        if (index < 0) {
          this.selected.push(item.date)
        } else {
          this.selected.splice(index, 1)
        }
      }
    },
    submitSelect: function (value) {
      debugger
      this.$emit('input', value)
      this.panelShow = false
    },
    changeMonth(num) {
      debugger
      if (this.seleMonth + num > 11) {
        this.seleMonth = 0
        this.seleYear++
      } else if (this.seleMonth + num < 0) {
        this.seleMonth = 11
        this.seleYear--
      } else {
        this.seleMonth += num
      }
    }
  }
}
