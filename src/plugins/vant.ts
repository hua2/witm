// 按需全局引入 vant组件
import { App as VM } from 'vue'
import { Button, Cell, Icon, Search, Swipe, SwipeItem, Grid, GridItem,Tabbar, TabbarItem,
    Popup, NavBar, Calendar, DatetimePicker, List,  Form, Field, CellGroup,  Image as VanImage, Uploader, Dialog,Tab, Tabs, Col, Row,
    RadioGroup, Radio, SwipeCell, Sticky, Picker   } from 'vant'

const plugins = [Button, Icon, Cell, Search, Swipe, SwipeItem, Grid, GridItem, Tabbar, TabbarItem,
    Popup, NavBar, Calendar, DatetimePicker, List,  Form, Field, CellGroup, VanImage, Uploader, Dialog, Tab, Tabs, Col, Row,
    RadioGroup, Radio, SwipeCell, Sticky, Picker ]

export const vantPlugins = {
    install: function(vm: VM) {
        plugins.forEach(item => {
            vm.component(item.name, item)
        })
    }
}