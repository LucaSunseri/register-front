<template>
	<div class="ls-overlay">
		<div class="ls-signature">
			<div class="ls-signature__top">
				<h2>Firma</h2>
				<div class="ls-signature__top__btn">
					<button type="button" class="btn btn-secondary mx-2" @click="clear()">Clear</button>
					<button type="button" class="btn btn-primary" @click="save(); $emit('clickSave');">Save</button>		
				</div>
			</div>
			<ejs-signature id="signature" class="ls-signature__box"></ejs-signature>
		</div>	
	</div>
</template>

<script>
import { getComponent } from '@syncfusion/ej2-base';

export default {
	name: 'Signature',
	methods: {
		clear() {
			const signature = getComponent(document.getElementById('signature'), 'signature');
			signature.clear();
		},
		save() {
			const signature = getComponent(document.getElementById('signature'), 'signature');
			const signatureSave = signature.getSignature();
			if(!signature.isEmpty()) {
				const payload = {
					signature: signatureSave
				}
				this.$store.dispatch('saveSignature', payload);
				signature.clear();
			}
		}
	} 

}
</script>

<style lang="scss" scoped>
.ls-overlay {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(46, 45, 45, 0.605);
	overflow: hidden;
}
.ls-signature {
	width: 60%;
	height: 50%;
	background-color: white;
	border-radius: 25px;
	.ls-signature__top {
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 25px;	
		border-bottom: 1px solid black;
	}
	.ls-signature__box {
		width: 100%;
		height: calc(90% - 50px);
	}
}
</style>