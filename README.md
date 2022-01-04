<p align="center">

  <img width="130" alt="vue-storage logo" src="https://cdn.rawgit.com/RobinCK/0ef39abfff9a44061cee5b2c072e892e/raw/e2b95a57825ac9b8e845609ff9fc5fdaae37b55a/logo.svg">
  
</p>

<p align="center">
  <a href="https://opencollective.com/vue-Storage" alt="Financial Contributors on Open Collective"><img src="https://opencollective.com/vue-vst/all/badge.svg?label=financial+contributors" /></a>
  <a href="https://github.com/RobinCK/vue-vst"><img src="https://img.shields.io/badge/vuejs-1.x-brightgreen.svg?style=flat-square"></a>
  <a href="https://github.com/RobinCK/vue-vst"><img src="https://img.shields.io/badge/vuejs-2.x-brightgreen.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/RobinCK/vue-vst"><img src="https://img.shields.io/travis/RobinCK/vue-vst.svg?style=flat-square"></a>
  <a href="https://coveralls.io/github/RobinCK/vue-vst?branch=master"><img src="https://img.shields.io/coveralls/RobinCK/vue-vst.svg?style=flat-square"></a>
  <a href="http://inch-ci.org/github/RobinCK/vue-vst"><img src="https://inch-ci.org/github/RobinCK/vue-vst.svg?branch=master&style=flat-squar"></a>
  <a href="https://houndci.com"><img src="https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg"></a>
  
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-vst"><img src="https://img.shields.io/npm/dm/vue-vst.svg?style=flat-square"></a>
  <a href="https://david-dm.org/robinck/vue-vst"><img src="https://img.shields.io/david/RobinCk/vue-vst.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/vue-vst"><img src="https://img.shields.io/npm/v/vue-vst.svg?style=flat-square"></a>
  <a href="https://cdnjs.com/libraries/vue-vst"><img src="https://img.shields.io/cdnjs/v/vue-vst.svg"></a>
  <a href="https://github.com/RobinCK/vue-vst/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue-vst.svg?style=flat-square"></a>
 
</p>

<p align="center">
<img src="https://app.saucelabs.com/browser-matrix/Robin_ck.svg">

</p>

# vue-Storage

[![Greenkeeper badge](https://badges.greenkeeper.io/RobinCK/vue-storage.svg)](https://greenkeeper.io/)

Vue plugin for work with local storage, session storage and memory storage from Vue(2.x or 3.x) context

[![NPM](https://nodei.co/npm/vue-vst.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-vst/)

## Install

Also available on <a href="https://cdn.jsdelivr.net/npm/vue-vst@latest">jsDelivr</a> or <a href="https://cdnjs.com/libraries/vue-vst">cdnjs<a/>, but these two services take some time to sync so the latest release may not be available yet.

#### NPM

```bash
npm install vue-storage --save
```

#### Yarn

```bash
yarn add vue-storage
```

## Development Setup

```bash
# install dependencies
yarn install

# build dist files
yarn build
```

## Usage

Vue storage API.

```js
import Storage from 'vue-storage'

options = {
  namespace: 'vuejs__', // key prefix
  name: 'vst', // name variable Vue.[vst] or this.[$vst],
  storage: 'local', // storage name session, local, memory
}

Vue.use(Storage, options)

//or
//Vue.use(Storage);

new Vue({
  el: '#app',
  mounted: function () {
    Vue.vst.set('foo', 'boo')
    //Set expire for item
    Vue.vst.set('foo', 'boo', 60 * 60 * 1000) //expiry 1 hour
    Vue.vst.get('foo')
    Vue.vst.get('boo', 10) //if not set boo returned default 10

    let callback = (val, oldVal, uri) => {
      console.log('localStorage change', val)
    }

    Vue.vst.on('foo', callback) //watch change foo key and triggered callback
    Vue.vst.off('foo', callback) //unwatch

    Vue.vst.remove('foo')
  },
})
```

#### Global

- `Vue.vst`

#### Context

- `this.$vst`

## API

#### `Vue.vst.get(name, def)`

Returns value under `name` in storage. Internally parses the value from JSON before returning it.

- `def`: default null, returned if not set `name`.

#### `Vue.vst.set(name, value, expire)`

Persists `value` under `name` in storage. Internally converts the `value` to JSON.

- `expire`: default null, life time in milliseconds `name`

#### `Vue.vst.remove(name)`

Removes `name` from storage. Returns `true` if the property was successfully deleted, and `favste` otherwise.

#### `Vue.vst.clear()`

Clears storage.

#### `Vue.vst.on(name, callback)`

Listen for changes persisted against `name` on other tabs. Triggers `callback` when a change occurs, passing the following arguments.

- `newValue`: the current value for `name` in storage, parsed from the persisted JSON
- `oldValue`: the old value for `name` in storage, parsed from the persisted JSON
- `url`: the url for the tab where the modification came from

#### `Vue.vst.off(name, callback)`

Removes a listener previously attached with `Vue.vst.on(name, callback)`.

Testing Supported By<br>
<img width="200" src="https://cdn.rawgit.com/RobinCK/b1435c9cae05437ad9e4c2023aec08e4/raw/4b89e95cd89827935e6e3949d28a4f6ea3e48ee4/browser-stack.svg">

## Note

Some browsers don't support the storage event, and most of the browsers that do support it will only call it when the storage is changed by a different window. So, open your page up in two windows. Click the links in one window and you will probably see the event in the other.

The assumption is that your page will already know all interactions with localStorage in its own window and only needs notification when a different window changes things. This, of course, is a foolish assumption. But.

#### Individuals

<a href="https://opencollective.com/vue-vst"><img src="https://opencollective.com/vue-vst/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/vue-vst/contribute)]

<a href="https://opencollective.com/vue-vst/organization/0/website"><img src="https://opencollective.com/vue-vst/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/1/website"><img src="https://opencollective.com/vue-vst/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/2/website"><img src="https://opencollective.com/vue-vst/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/3/website"><img src="https://opencollective.com/vue-vst/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/4/website"><img src="https://opencollective.com/vue-vst/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/5/website"><img src="https://opencollective.com/vue-vst/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/6/website"><img src="https://opencollective.com/vue-vst/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/7/website"><img src="https://opencollective.com/vue-vst/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/8/website"><img src="https://opencollective.com/vue-vst/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/vue-vst/organization/9/website"><img src="https://opencollective.com/vue-vst/organization/9/avatar.svg"></a>

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FRobinCK%2Fvue-vst.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FRobinCK%2Fvue-vst?ref=badge_large)

MIT © [Igor Ognichenko](https://github.com/RobinCK)
