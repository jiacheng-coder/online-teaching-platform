export default createStore({
    state () {
		return {
			baseToken : 'no',
			userToken : 'no',
			userFace  : ''
		}
    },
    mutations: {
		setBaseToken (state, baseToken) {
			state.baseToken = baseToken;
		},
		setUserToken (state, userToken) {
			state.userToken = userToken;
		},
		setUserFace (state, userFace){
			state.userFace = userFace;
		}
    }
});