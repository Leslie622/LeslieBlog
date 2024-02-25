import mitt from 'mitt'

type Events = {
  blogConfigChanged: void
  pullupBlogConfig:void
  pullupHeader:void
}

const emitter = mitt<Events>()

export default emitter
