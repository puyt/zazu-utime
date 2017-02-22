## Zazu-utime

A simple timestamp plugin for [Zazu](http://zazuapp.org/), inspired by this [Chrome extension](https://chrome.google.com/webstore/detail/kpcibgnngaaabebmcabmkocdokepdaki).


## Usage

Open Zazu and type a timestamp or human-readable date, the plugin will try and translate most of it.

Examples:
- `now`
- `today`
- `1487718000`
- `the end of next week`

For more examples see https://sugarjs.com/dates/#/Parsing


## Installing

Add `puyt/zazu-utime` inside of `plugins` block of your  `~/.zazurc.json` file.

~~~ json
{
  "plugins": [
      "puyt/zazu-utime"
  ]
}
~~~

### Variables
- `timestampUnit`: seconds or milliseconds
- `outputFormat`: see https://sugarjs.com/dates/#/Formatting for all possible options

~~~ json
{
  "plugins": [
    {
        "name": "puyt/zazu-utime",
        "variables": {
            "timestampUnit": "milliseconds",
            "timestampUnit": "{yyyy}/{MM}/{dd} {HH}:{mm}:{s}"
        }
    }
  ]
}
~~~


## Screenshots
![example1](./assets/example1.png)
![example2](./assets/example2.png)
![example3](./assets/example3.png)
![example4](./assets/example4.png)


## Acknowledgments
Most of the plugin it's :muscle: is coming from [Sugarjs](https://sugarjs.com/)


## See also
- [`tinytacoteam/zazu`](http://github.com/tinytacoteam/zazu)

## License

[MIT](LICENSE.md)