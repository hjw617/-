<template>
  <div class="demo-image__placeholder">
    <el-card>
      <div class="textStyle">
        <h1>优秀员工</h1>
      </div>
    </el-card>
    <el-card>
     <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in dataimg" :key="item.value">
       <div class="carousel-explain">
           <img :src="item.src">
       </div>
     </el-carousel-item>
    </el-carousel>
   </el-card>
   <el-card>
     <h1>员工绩效考核内容</h1>
     <br>
     <div class="italictext">
      <h2>1、工作态度：不迟到、早退、缺勤，工作态度认真；工作不偷懒，不懈怠；遵守上级的指示。</h2>
      <h2>2、基础能力：精通职务内容，具备处理事务的能力；掌握个人工作的重点；在既定的时间内完成工作。</h2>
      <h2>3、业务水平：工作没有差错，且速度快；处理事物能力卓越；可以独立并正确完成新的工作。</h2>
     </div>
     <!-- <el-input></el-input> -->
   </el-card>
  </div>
</template>
<script>
export default {
    data() {
        return {
            dataimg: [
                {
                    src: 'https://wx3.sinaimg.cn/mw2000/e147ef41ly1h15pbp1rtsj20hs0c041r.jpg'
                },
                {
                    src: 'https://img2.baidu.com/it/u=807476031,2659152526&fm=253&fmt=auto&app=120&f=JPEG?w=820&h=512'
                },
                {
                    src: 'https://img2.baidu.com/it/u=4190122881,620148590&fm=253&fmt=auto&app=120&f=JPEG?w=576&h=360'
                },
                {
                    src: 'https://img2.baidu.com/it/u=2578837775,1087594440&fm=253&fmt=auto&app=138&f=JPEG?w=812&h=500'
                }
            ]
        }
    }
}
</script>

<style>
.italictext{
  left:50%;
  width: 600px;
  margin-left:-300px;
  position: relative;
}
h1 {
  font-size: 20px !important;
  text-align:center;
}
h2 {
  font-family: "Simsun";
  font-size: 17px;
}
.textStyle {
  text-align: center;
}
img {
  background-size: 100% 100%;
}
</style>
