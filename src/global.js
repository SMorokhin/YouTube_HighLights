import ModalWindow from './components/UI/ModalWindow/ModalWindow.vue'
import MainContent from './components/MainContent/MainContent/MainContent'
import DescriptionDisplay from './components/MainContent/DescriptionDisplay/DescriptionDisplay'
import Navigation from './components/MainContent/Navigation/Navigation'
import ChannelDescription from './components/ChannelDescription/ChannelDescription/ChannelDescription'
import VideosTile from './components/ChannelDescription/VideosTile/VideosTile'
import Loader from './components/UI/Loader/Loader'
import NoData from './components/UI/NoData/NoData'

export default (app) => {
  app.component('ModalWindow', ModalWindow)
    .component('MainContent', MainContent)
    .component('DescriptionDisplay', DescriptionDisplay)
    .component('Navigation', Navigation)
    .component('ChannelDescription', ChannelDescription)
    .component('VideosTile', VideosTile)
    .component('Loader', Loader)
    .component('NoData', NoData)
}
