import mitt from 'mitt'

type Events = {
  blogConfigChanged: void
}

const emitter = mitt<Events>()

export default emitter
