<!-- 加上 sb-show-main 和 docs-story 以便在兩種情境中支援格線 -->
<template>
	<v-app theme="dark" class="sb-show-main docs-story">
		<v-main class="pa-5">
			<slot />
		</v-main>
	</v-app>
</template>

<style lang="scss">
	body {
		padding: 0 !important;
	}

	:not(.v-application).docs-story {
		& > :first-child {
			padding: 0 !important;

			& > * > * > div {
				border: none !important;
			}
		}

		.v-application {
			padding-bottom: 30px !important;
		}

		.v-application__wrap {
			min-height: unset;
		}
	}
</style>
