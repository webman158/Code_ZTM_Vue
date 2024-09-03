<script>
export default {
  data() {
    return {
      flag: !false,
      list: [
        { id: 1, name: '张三', age: 25 },
        { id: 2, name: '李四', age: 30 },
        { id: 3, name: '王五', age: 22 },
        { id: 4, name: '赵六', age: 28 },
        { id: 5, name: '刘七', age: 35 },
        { id: 6, name: '陈八', age: 40 },
        { id: 7, name: '许九', age: 19 },
        { id: 8, name: '孙十', age: 45 },
        { id: 9, name: '周十一', age: 29 },
        { id: 10, name: '吴十二', age: 32 },
      ],
    }
  },
  methods: {
    beforeEnter(el) {
      console.log('beforeEnter fired', el)
    },
    enter(el) {
      console.log('enter fired', el)

      // const animation = el.animate([{ transform: 'scale(0)' }, {}], {
      //   duration: 1000,
      // })

      // animation.onfinish = () => {
      //   done()
      // }
    },
    afterEnter(el) {
      console.log('afterEnter fired', el)
    },
    beforeLeave(el) {
      console.log('beforeLeave fired', el)
    },
    leave(el) {
      console.log('leave fired', el)

      // const animation = el.animate([{}, { transform: 'scale(0)' }], {
      //   duration: 1000,
      // })

      // animation.onfinish = () => {
      //   done()
      // }
    },
    afterLeave(el) {
      console.log('afterLeave fired', el)
    },

    add() {
      const obj = {
        id: +new Date(),
        name: +new Date(),
        age: Math.floor(Math.random() * 100 + 1),
      }
      const index = Math.floor(Math.random() * this.list.length)
      this.list.splice(index, 0, obj)
    },
    remove(id) {
      this.list = this.list.filter((item) => item.id !== id)
    },
  },
}
</script>

<template>
  <button @click="flag = !flag">切换 标题</button>

  <!-- <h3 v-if="flag">不带动画</h3> -->

  <hr />

  <!-- 
    transition 组件的配置
    1. duration="3000" 过渡的时长
    2. mode 决定动画的顺序
      out-in  出去的元素先做动画，结束之后在让进来的元素做动画
      in-out  进来的元素先做动画，结束之后在让出来的元素做动画
    3. type 属性： 决定当同时使用过渡和动画的时候，具体以哪个时间为准
    4. appear 属性： 决定动画是否一开始就执行
    5. css 属性，直接跳转css动画（表示没有css动画），直接使用js动画
   -->

  <!-- 过渡效果 -->
  <!-- <transition name="fade" mode="in-out">
    <h3 v-if="flag" key="main">带动画</h3>
    <h3 v-else key="sub">丽娜</h3>
  </transition> -->

  <!-- 动画效果 -->
  <!-- <transition name="zoom" type="transition" appear>
    <h2 v-if="flag">animate 动画效果</h2>
  </transition> -->

  <!-- JS动画钩子函数 -->
  <!-- <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <h2 v-if="flag">JS 动画效果</h2>
  </transition> -->

  <!-- 将CSS 动画 和 JS 动画结合在一起使用 -->
  <!-- 需要注意：钩子函数 enter 和 leave 的done参数需要去掉，这样vue才会使用css动画的时间 -->
  <!-- <transition
    :css="true"
    name="fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <h2 v-if="flag">JS 动画效果</h2>
  </transition> -->

  <!-- 过渡列表 -->
  <!-- <button @click="add">随机添加新数据到随机位置</button>
  <ul>
    <transition-group name="fade" appear>
      <li v-for="item in list" :key="item.id">
        {{ item.name }} --- {{ item.age }} 岁

        <span @click="remove(item.id)">×</span>
      </li>
    </transition-group>
  </ul> -->

  <!-- 使用第三方动画库 -->
  <button @click="add">随机添加新数据到随机位置</button>
  <ul>
    <transition-group
      name="fade"
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__zoomOut"
    >
      <li v-for="item in list" :key="item.id">
        {{ item.name }} --- {{ item.age }} 岁

        <span @click="remove(item.id)">×</span>
      </li>
    </transition-group>
  </ul>
</template>

<style>
.animate__animated {
  animation-duration: 1.3s;
}
.animate__zoomOut {
  position: absolute;
}

li {
  font-size: 26px;
}

li span {
  cursor: pointer;
}

/* 过渡开始状态: 当元素进入到页面中，会添加到元素中 */
/* .fade-enter-from {
  opacity: 0;
} */

/* 过渡进行中 */
/* .fade-enter-active {
  transition: all 0.3s linear;
}
 */
/* .fade-leave-to {
  transition: all 0.3s linear;
  opacity: 0;
}
 */

/* active 进行中 添加过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: all 1s linear;
}

/* 进入 和 离开都隐藏 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}

.fade-move {
  transition: all 1s linear;
}

h2 {
  width: 400px;
  margin: 20px;
  padding: 20px;
  /* background-color: #f99; */
}

.zoom-enter-active {
  animation: zoom-in 1s linear forwards;
  transition: all 2s linear;
}

.zoom-leave-active {
  animation: zoom-out 1s linear forwards;
  transition: all 2s linear;
}

.zoom-enter-from {
  opacity: 0;
}
.zoom-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes zoom-out {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
</style>
