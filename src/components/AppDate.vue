<template>
  <span
      v-tippy="{content: `${humanFirendlyDate}`}"
    >
      {{ diffForHumans }}
    </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ptbr from 'dayjs/locale/pt-br'
import localizedDate from 'dayjs/plugin/localizedFormat'

dayjs.locale(ptbr)
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

export default {
  props: {
    timestamp: {
      type: [Number, Object],
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    normalizedTimestamp () {
      return this.timestamp?.seconds || this.timestamp
    },
    diffForHumans () {
      return dayjs.unix(this.normalizedTimestamp).fromNow()
    },
    humanFirendlyDate () {
      return dayjs.unix(this.normalizedTimestamp).format('llll')
      // return new Intl.DateTimeFormat(
      //   'pt-BR',
      //   {
      //     weekday: 'long',
      //     hour: 'numeric',
      //     minute: 'numeric',
      //     month: 'long',
      //     day: '2-digit',
      //     year: 'numeric'
      //   }
      // ).format(new Date(this.timestamp * 1000))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
