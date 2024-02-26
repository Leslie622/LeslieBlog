<template>
  <div class="not-found-wrapper">
    <div class="content">
      <div class="rail">
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
      </div>
      <div class="world">
        <div class="forward">
          <div class="box">
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hint">
      <button class="btn-goHome" @click="goHome">GO HOME</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

/**
 * 回主页
 */
function goHome() {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.not-found-wrapper {
  height: 100vh;
  background-color: #000;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  font-family: 'Anton', sans-serif;
  overflow: hidden;
  transform: translateY(-7.5rem);
  -webkit-perspective: 62.5rem;
  perspective: 62.5rem;
}

div {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.rail {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: rotateX(-30deg) rotateY(-30deg);

  -webkit-transform: rotateX(-30deg) rotateY(-30deg);
}
.rail .stamp {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.5rem;
  height: 12.5rem;
  font-size: 7rem;
  color: #fff;
  background: #141414;
}
.rail .stamp:nth-child(1) {
  animation: stampSlide 40000ms -2300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -2300ms linear infinite;
}
.rail .stamp:nth-child(2) {
  animation: stampSlide 40000ms -4300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -4300ms linear infinite;
}
.rail .stamp:nth-child(3) {
  animation: stampSlide 40000ms -6300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -6300ms linear infinite;
}
.rail .stamp:nth-child(4) {
  animation: stampSlide 40000ms -8300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -8300ms linear infinite;
}
.rail .stamp:nth-child(5) {
  animation: stampSlide 40000ms -10300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -10300ms linear infinite;
}
.rail .stamp:nth-child(6) {
  animation: stampSlide 40000ms -12300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -12300ms linear infinite;
}
.rail .stamp:nth-child(7) {
  animation: stampSlide 40000ms -14300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -14300ms linear infinite;
}
.rail .stamp:nth-child(8) {
  animation: stampSlide 40000ms -16300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -16300ms linear infinite;
}
.rail .stamp:nth-child(9) {
  animation: stampSlide 40000ms -18300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -18300ms linear infinite;
}
.rail .stamp:nth-child(10) {
  animation: stampSlide 40000ms -20300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -20300ms linear infinite;
}
.rail .stamp:nth-child(11) {
  animation: stampSlide 40000ms -22300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -22300ms linear infinite;
}
.rail .stamp:nth-child(12) {
  animation: stampSlide 40000ms -24300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -24300ms linear infinite;
}
.rail .stamp:nth-child(13) {
  animation: stampSlide 40000ms -26300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -26300ms linear infinite;
}
.rail .stamp:nth-child(14) {
  animation: stampSlide 40000ms -28300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -28300ms linear infinite;
}
.rail .stamp:nth-child(15) {
  animation: stampSlide 40000ms -30300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -30300ms linear infinite;
}
.rail .stamp:nth-child(16) {
  animation: stampSlide 40000ms -32300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -32300ms linear infinite;
}
.rail .stamp:nth-child(17) {
  animation: stampSlide 40000ms -34300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -34300ms linear infinite;
}
.rail .stamp:nth-child(18) {
  animation: stampSlide 40000ms -36300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -36300ms linear infinite;
}
.rail .stamp:nth-child(19) {
  animation: stampSlide 40000ms -38300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -38300ms linear infinite;
}
.rail .stamp:nth-child(20) {
  animation: stampSlide 40000ms -40300ms linear infinite;

  -webkit-animation: stampSlide 40000ms -40300ms linear infinite;
}

@-webkit-keyframes stampSlide {
  0% {
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(8.125rem);

    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(8.125rem);
  }
  100% {
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(-241.8rem);

    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(-241.8rem);
  }
}

@keyframes stampSlide {
  0% {
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(8.125rem);

    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(8.125rem);
  }
  100% {
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(-241.8rem);

    -webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-12.5rem) translateY(-241.8rem);
  }
}
.world {
  transform: rotateX(-30deg) rotateY(-30deg);

  -webkit-transform: rotateX(-30deg) rotateY(-30deg);
}
.world .forward {
  position: absolute;
  animation: slide 2000ms linear infinite;

  -webkit-animation: slide 2000ms linear infinite;
}
.world .box {
  width: 12.5rem;
  height: 12.5rem;
  animation: roll 2000ms cubic-bezier(1, 0.01, 1, 1) infinite;

  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
  -webkit-animation: roll 2000ms cubic-bezier(1, 0.01, 1, 1) infinite;
}
.world .box .wall {
  position: absolute;
  box-sizing: border-box;
  width: 12.5rem;
  height: 12.5rem;
  border: 1px solid #fafafa;
  background: rgba(10, 10, 10, 0.8);
}
.world .box .wall::before {
  content: '';
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 7rem;
  color: #fff;
}
.world .box .wall:nth-child(1) {
  transform: translateZ(6.25rem);

  -webkit-transform: translateZ(6.25rem);
}
.world .box .wall:nth-child(2) {
  transform: rotateX(180deg) translateZ(6.25rem);

  -webkit-transform: rotateX(180deg) translateZ(6.25rem);
}
.world .box .wall:nth-child(3) {
  transform: rotateX(90deg) translateZ(6.25rem);

  -webkit-transform: rotateX(90deg) translateZ(6.25rem);
}
.world .box .wall:nth-child(3)::before {
  animation: zeroFour 4000ms -2000ms linear infinite;
  transform: rotateX(180deg) rotateZ(90deg) translateZ(-1px);

  -webkit-transform: rotateX(180deg) rotateZ(90deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms -2000ms linear infinite;
}
.world .box .wall:nth-child(4) {
  transform: rotateX(-90deg) translateZ(6.25rem);

  -webkit-transform: rotateX(-90deg) translateZ(6.25rem);
}
.world .box .wall:nth-child(4)::before {
  animation: zeroFour 4000ms -2000ms linear infinite;
  transform: rotateX(180deg) rotateZ(-90deg) translateZ(-1px);

  -webkit-transform: rotateX(180deg) rotateZ(-90deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms -2000ms linear infinite;
}
.world .box .wall:nth-child(5) {
  transform: rotateY(90deg) translateZ(6.25rem);

  -webkit-transform: rotateY(90deg) translateZ(6.25rem);
}
.world .box .wall:nth-child(5)::before {
  animation: zeroFour 4000ms linear infinite;
  transform: rotateX(180deg) translateZ(-1px);

  -webkit-transform: rotateX(180deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms linear infinite;
}
.world .box .wall:nth-child(6) {
  transform: rotateY(-90deg) translateZ(6.25rem);

  -webkit-transform: rotateY(-90deg) translateZ(6.25rem);
}
.world .box .wall:nth-child(6)::before {
  animation: zeroFour 4000ms linear infinite;
  transform: rotateX(180deg) rotateZ(180deg) translateZ(-1px);

  -webkit-transform: rotateX(180deg) rotateZ(180deg) translateZ(-1px);
  -webkit-animation: zeroFour 4000ms linear infinite;
}

@-webkit-keyframes zeroFour {
  0% {
    content: '4';
  }
  100% {
    content: '0';
  }
}

@keyframes zeroFour {
  0% {
    content: '4';
  }
  100% {
    content: '0';
  }
}
@-webkit-keyframes roll {
  0% {
    transform: rotateZ(0deg);

    -webkit-transform: rotateZ(0deg);
  }
  85% {
    transform: rotateZ(90deg);

    -webkit-transform: rotateZ(90deg);
  }
  87% {
    transform: rotateZ(88deg);

    -webkit-transform: rotateZ(88deg);
  }
  90% {
    transform: rotateZ(90deg);

    -webkit-transform: rotateZ(90deg);
  }
  100% {
    transform: rotateZ(90deg);

    -webkit-transform: rotateZ(90deg);
  }
}
@keyframes roll {
  0% {
    transform: rotateZ(0deg);

    -webkit-transform: rotateZ(0deg);
  }
  85% {
    transform: rotateZ(90deg);

    -webkit-transform: rotateZ(90deg);
  }
  87% {
    transform: rotateZ(88deg);

    -webkit-transform: rotateZ(88deg);
  }
  90% {
    transform: rotateZ(90deg);

    -webkit-transform: rotateZ(90deg);
  }
  100% {
    transform: rotateZ(90deg);

    -webkit-transform: rotateZ(90deg);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: translateX(0);

    -webkit-transform: translateX(0);
  }
  100% {
    transform: translateX(-12.5rem);

    -webkit-transform: translateX(-12.5rem);
  }
}
@keyframes slide {
  0% {
    transform: translateX(0);

    -webkit-transform: translateX(0);
  }
  100% {
    transform: translateX(-12.5rem);

    -webkit-transform: translateX(-12.5rem);
  }
}

.hint {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  bottom: 9rem;
  width: 100vw;
}

.hint-text {
  margin: 6rem 0;
  font-size: 1.8rem;
  color: #fff;
}

.btn-goHome {
  margin: 20px;
  width: 12.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
  color: #fff;
  background-image: linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516);
  background-size: 300% 100%;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

.btn-goHome:hover {
  background-position: 100% 0;
  transition: all 0.4s ease-in-out;
}

.btn-goHome:focus {
  outline: none;
}
</style>
