export const state = () => ({
  drawerMobile: false,
  selectGame: null,
})

export const getters = {
  getDrawerMobile: (state) => {
    return state.drawerMobile
  },
  getSelectGame: (state) => {
    return state.selectGame
  },
}

export const mutations = {
  setDrawerMobile(state, bool) {
    state.drawerMobile = bool
  },
  setSelectGame(state, game) {
    console.log(game)
    state.selectGame = game
  },
}
