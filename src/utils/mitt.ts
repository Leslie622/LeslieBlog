import mitt from 'mitt'

type Events = {
  blogConfigChanged: void
  navigationChanged: void
}

const emitter = mitt<Events>()

export default emitter
