# [Deno](https://deno.land/) Scripts

## [SIP008 to SIP002](SIP008-to-SIP002.ts)

Convert Shadowsocks [SIP008 Online Config](https://shadowsocks.org/en/wiki/SIP008-Online-Configuration-Delivery.html) to [SIP002 URI Scheme](https://shadowsocks.org/en/wiki/SIP002-URI-Scheme.html) (`ss://` protocol).

- [API Reference](https://doc.deno.land/https/github.com/kidonng/cherry/raw/master/deno/SIP008-to-SIP002.ts)
- Usage

  ```sh
  deno run --allow-net https://github.com/kidonng/cherry/raw/master/deno/SIP008-to-SIP002.ts <Online Config URL>
  ```

## [SIP008 to Clash](SIP008-to-Clash.ts)

Convert Shadowsocks [SIP008 Online Config](https://shadowsocks.org/en/wiki/SIP008-Online-Configuration-Delivery.html) to [Clash config](https://github.com/Dreamacro/clash/wiki/configuration).

Reads `rules` config from `~/.config/clash/Private.yaml` if it exists.

```sh
deno run --allow-net --allow-env --allow-read https://github.com/kidonng/cherry/raw/master/deno/SIP008-to-Clash.ts <Online Config URL> > ~/.config/clash/Sub.yaml
```

## [Base64 to Clash](Base64-to-Clash.ts)

Convert Base64 subscriptions (VMESS and Trojan) to [Clash config](https://github.com/Dreamacro/clash/wiki/configuration).

Reads `rules` config from `~/.config/clash/Private.yaml` if it exists.

```sh
deno run --allow-net --allow-env --allow-read https://github.com/kidonng/cherry/raw/master/deno/Base64-to-Clash.ts <Online Config URL> > ~/.config/clash/Sub.yaml
```

## [NCU COVID Sign](ncu-covid-sign.ts)

```sh
NCU_TOKEN=foobar deno run --allow-net --allow-env https://github.com/kidonng/cherry/raw/master/deno/ncu-covid-sign.ts
```

## [YouTube URL to playlist](YouTube-URL-to-playlist.ts)

Convert a YouTube video URL to its parent playlist.

```sh
deno run https://github.com/kidonng/cherry/raw/master/deno/YouTube-URL-to-playlist.ts <playlist URL>
```
