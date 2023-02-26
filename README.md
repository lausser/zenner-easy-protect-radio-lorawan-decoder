# zenner-easy-protect-radio-lorawan-decoder
A decoder function for the Helium console.

It parses the binary payload of a [ZENNER Smoke Detector Easy Protect Radio LoRaWAN](https://zenner.com/products/rwm_easy_protect_funk-2/) and creates a Json structure for further processing.

I can not confirm it, but i am pretty sure that it works for this smoke detector as well: [Brunata Minol Funk-Rauchwarnmelder Minoprotect 4 radio](https://www.minol.de/minoprotect-4-radio.html)

```
root@f10a04f172e0:/helium# DEBUG=1 node decode.js khwAFAICAAEgAAj/////AAA=
payload:  khwAFAICAAEgAAj/////AAA=
hex payload:  92 1c 00 14 02 02 00 01 20 00 08 ff ff ff ff 00 00 
decoded:  {
    "decoder": "https://github.com/lausser/zenner-easy-protect-radio-lorawan-decoder",
    "port": 1,
    "packet_type": 9,
    "packet_subtype": 2,
    "packet_type_name": "SP9",
    "packet_subtype_name": "ST2",
    "firmware_version": "1C001402",
    "lorawan_version": "2.0.1",
    "lora_cmd_version": "0.20",
    "minol_device_type": "8",
    "meter_id": "-1"
}
```

Sending the data through this list of tools....
* [MQTT integration in Helium Console](https://docs.helium.com/use-the-network/console/integrations/mqtt/)
* [MQTT](https://mqtt.org/) - i use my own server. You might also use [flespi.io](https://flespi.io), but because of frequent hickups i can not recommend it for a setup where there is just one package per day.
* [MQTT2Prometheus](https://github.com/hikhvar/mqtt2prometheus)
* [Prometheus](https://prometheus.io)
* [Grafana](https://grafana.com/grafana/)
* [Grafana Plugin Flowcharting](https://github.com/algenty/grafana-flowcharting)

...and in the end there is an image showing how many hours ago a signal from a smoke detector was received.
![house](/assets/images/zenner-grafana.png)
