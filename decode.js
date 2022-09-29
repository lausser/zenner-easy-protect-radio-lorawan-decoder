function Decoder(bytes, port) {
    var obj = {};
    obj.decoder = "https://github.com/lausser/zenner-easy-protect-radio-lorawan-decoder";
    obj.port = port;
    if(bytes === null || bytes === 0){
        obj.packet_type_name = "EMPTY";
    } else {
        // Find out if SPx or AP
        const s_packet_type_0 = 0x00;
        const s_packet_type_1 = 0x01;
        const s_packet_type_2 = 0x01;
        const s_packet_type_3 = 0x03;
        const s_packet_type_4 = 0x04;
        const s_packet_type_5 = 0x05;
        const s_packet_type_6 = 0x06;
        const s_packet_type_7 = 0x07;
        const s_packet_type_8 = 0x08;
        const s_packet_type_9 = 0x09;
        const s_packet_type_12 = 0x0c;
        const a_packet_type_1 = 0x0a;
        const a_packet_type_2 = 0x0b;
        const packet_subtype_0 = 0x00;
        const packet_subtype_1 = 0x01;
        const packet_subtype_2 = 0x02;
        const packet_subtype_3 = 0x03;

        let packet = new Lorapacket(bytes);

        obj.packet_type = packet.shuft(0.5);
        obj.packet_subtype = packet.shuft(0.5);

        switch (obj.packet_type) {
            case s_packet_type_0:
                obj.packet_type_name = "SP0";
                obj.current_value = packet.shuft(4);
                obj.debug_data = packet.shuft(10);
                obj.current_value_hex = as_hex(obj.current_value);
                obj.debug_data_hex = as_hex(obj.debug_data);
                break;
            case s_packet_type_1:
                // daily
                obj.packet_type_name = "SP1";
                obj.day_value = packet.shuft(4);
                obj.day_value_hex = as_hex(obj.day_value);
                obj.day_value = sp1_day_value(obj.day_value);
                break;
            case s_packet_type_5:
                obj.packet_type_name = "SP5";
                obj.day_value_channel0 = packet.shuft(4);
                obj.day_value_channel1 = packet.shuft(4);
                obj.status_summary = packet.shuft(2);
                obj.day_value_channel0_hex = as_hex(obj.day_value_channel0);
                obj.day_value_channel1_hex = as_hex(obj.day_value_channel1);
                obj.status_summary_hex = as_hex(obj.status_summary);
                break;
            case s_packet_type_2:
                obj.packet_type_name = "SP2";
                obj.time_stamp = packet.shuft(4);
                obj.monthly_value = packet.shuft(4);
                obj.status_summary = packet.shuft(2);
                obj.time_stamp_hex = as_hex(obj.time_stamp);
                obj.monthly_value_hex = as_hex(obj.monthly_value);
                obj.status_summary_hex = as_hex(obj.status_summary);
                break;
            case s_packet_type_6:
                obj.packet_type_name = "SP6";
                obj.date_stamp = packet.shuft(2);
                obj.monthly_value_channel0 = packet.shuft(4);
                obj.monthly_value_channel1 = packet.shuft(4);
                obj.date_stamp_hex = as_hex(obj.date_stamp);
                obj.monthly_value_channel0_hex = as_hex(obj.monthly_value_channel0);
                obj.monthly_value_channel1_hex = as_hex(obj.monthly_value_channel1);
                break;
            case s_packet_type_3:
                obj.packet_type_name = "SP3";
                obj.date_stamp = packet.shuft(4);
                obj.monthly_value = packet.shuft(4);
                obj.half_monthly_value = packet.shuft(2);
                obj.date_stamp_hex = as_hex(obj.date_stamp);
                obj.monthly_value_hex = as_hex(obj.monthly_value);
                obj.half_monthly_value_hex = as_hex(obj.half_monthly_value);
                break;
            case s_packet_type_7:
                obj.packet_type_name = "SP7";
                obj.monthly_value_channel0 = packet.shuft(4);
                obj.half_monthly_value_channel0 = packet.shuft(4);
                obj.monthly_value_channel1 = packet.shuft(4);
                obj.half_monthly_value_channel1 = packet.shuft(4);
                obj.monthly_value_channel0_hex = as_hex(obj.monthly_value_channel0);
                obj.half_monthly_value_channel0_hex = as_hex(obj.half_monthly_value_channel0);
                obj.monthly_value_channel1_hex = as_hex(obj.monthly_value_channel1);
                obj.half_monthly_value_channel1_hex = as_hex(obj.half_monthly_value_channel1);
                break;
            case s_packet_type_4:
                obj.packet_type_name = "SP4";
                obj.date = packet.shuft(2);
                obj.value = packet.shuft(4);
                obj.status_summary = packet.shuft(2);
                obj.reserved = packet.shuft(2);
                obj.half_monthly_value = packet.shuft(2);
                // do is da hund drin
                //obj.date = bytes.slice(1, 3);
                //obj.value = bytes.slice(3, 7);
                //obj.status_summary = bytes.slice(7, 9);
                //obj.reserved = bytes.slice(9, 11);
                //obj.half_monthly_value = bytes.slice(9, 11);
                obj.date_stamp_hex = as_hex(obj.date_stamp);
                obj.monthly_value_hex = as_hex(obj.monthly_value);
                obj.half_monthly_value_hex = as_hex(obj.half_monthly_value);
                break;
            case s_packet_type_8:
                obj.packet_type_name = "SP8";
                obj.date = packet.shuft(2);
                obj.value_channel0 = packet.shuft(4);
                obj.value_channel1 = packet.shuft(4);
                break;
            case s_packet_type_9:
                obj.packet_type_name = "SP9";
                switch (obj.packet_subtype) {
                    case packet_subtype_0:
                        // schedule: n/a
                        // A SP9 subtype 0x00 packets encodes current date
                        // and time of the device.
                        // Devices will send a SP9 subtype 0x00 packet to
                        // enable the receiver side to check the device clock
                        //  and eventually resynchronize it using a CP packet
                        obj.packet_subtype_name = "ST0";
                        obj.time_stamp = packet.shuft(4);
                        obj.time_stamp_hex = as_hex(obj.time_stamp);
// alte conversion aufrufen, eingabetypen vergleichen
                    break;
                    case packet_subtype_1:
                        // Sent every month
                        // except the month of first activation
                        obj.packet_subtype_name = "ST1";
                        obj.time_stamp = packet.shuft(4);
                        obj.status_summary = packet.shuft(2);
                        obj.reserved = packet.shuft(4);
                        obj.time_stamp_hex = as_hex(obj.time_stamp);
                        obj.time_stamp = date_time_format(obj.time_stamp);
                        obj.status_summary_hex = as_hex(obj.status_summary);
                        obj.reserved_hex = as_hex(obj.reserved);
                    break;
                    case packet_subtype_2:
                        // Sent immediately after first
                        // activation and from then on
                        // every 6 months
                        obj.packet_subtype_name = "ST2";
                        firmware_version = packet.shuft(4);
                        lorawan_version = packet.shuft(3);
                        lora_cmd_version = packet.shuft(2);
                        device_type = packet.shuft(1);
                        meter_id = packet.shuft(4);
                        reserved = packet.shuft(2);
                        obj.firmware_version = ((firmware_version[0] << 24)
                            + (firmware_version[1] << 16)
                            + (firmware_version[2] << 8)
                            + (firmware_version[3])).toString(16).toUpperCase();
                        obj.lorawan_version = lorawan_version[0].toString(16) +
                            "." + lorawan_version[1].toString(16) +
                            "." + lorawan_version[2].toString(16);
                        obj.lora_cmd_version = lora_cmd_version[1].toString(16) +
                            "." + lora_cmd_version[0].toString(16);
                        obj.minol_device_type = device_type.toString(16);
                        obj.meter_id = ((meter_id[0] << 24)
                            + (meter_id[1] << 16)
                            + (meter_id[2] << 8)
                            + (meter_id[3])).toString(16).toUpperCase();
                    break;
                    case packet_subtype_3:
                        obj.packet_subtype_name = "ST3";
                    break;
                    default:
                        obj.packet_subtype_name = "UNIMPLEMENTED";
                    break;
                }
                break;
            case s_packet_type_12:
                obj.packet_type_name = "SP12";
                break;
            case a_packet_type_1:
                obj.packet_type_name = "AP1";
                obj.status_code = packet.shuft(1)
                obj.status_data = packet.shuft(3)
                //obj.overhead = packet.shuft(13)
                obj.status_code_hex = as_hex(obj.status_code);
                obj.status_data_hex = as_hex(obj.status_data);
                var status = ap1_status(obj.status_code, obj.status_data);
                obj.status_code = status[0];
                obj.status_data = status[1];
                break;
            case a_packet_type_2:
                obj.packet_type_name = "AP2";
                break;
            default:
                obj.packet_type_name = "UNIMPLEMENTED";
                break;
        }
        return obj;
    }
}

function as_hex(bytebuffer) {
    if (typeof bytebuffer[Symbol.iterator] === 'function') {
        var intbuf = Uint8Array.from(bytebuffer);
    } else {
        var intbuf = Uint8Array.from([bytebuffer]);
    }
    len = intbuf.length;
    hexbuf = new Array(len);
    while (len--)
        hexbuf[len] = (intbuf[len] < 16 ? '0' : '') + intbuf[len].toString(16);
    return hexbuf.join(' ');
}

function date_time_format(cp32) {
    // 07 20 C1 29
    // EN13757-3:2013, Annex A, data type F
    // 01.04.99 23:45 --> 2D1761C4
    // 0111001000001100000100101001
    // YY-MM-DD HH:MM
    // https://iot-shop.de/web/image/45108?unique=f4103674fa25aa001646a02fd7c0aeb30adc7d4b Annex 5.1
    let datebytes = (0b00000000000000000000000011111111 & cp32[0]) | ((0b00000000000000000000000011111111 & cp32[1]) << 8) | ((0b00000000000000000000000011111111 & cp32[2]) << 16) | ((0b00000000000000000000000011111111 & cp32[3]) << 24);
console.log(datebytes);
    let minute = (0b00000000000000000000000000111111 & datebytes);
    if (minute == 63) {
        minute = "X";
    } else {
        minute = minute.toString().padStart(2, "0");
    }
    let hour   = (0b00000000000000000001111100000000 & datebytes) >> 8;
    if (hour == 31) {
        hour = "X";
    } else {
        hour = hour.toString().padStart(2, "0");
    }
    let day =    (0b00000000000111110000000000000000 & datebytes) >> 16;
    if (day == 0) {
        day = "X";
    } else {
        day = day.toString().padStart(2, "0");
    }
    let month =  (0b00001111000000000000000000000000 & datebytes) >> 24;
    if (month == 15) {
        month = "X";
    } else {
        month = month.toString().padStart(2, "0");
    }
    let yearh =  (0b11110000000000000000000000000000 & datebytes) >> 28;
    let yearl =  (0b00000000111000000000000000000000 & datebytes) >> 21;
    let year = yearh << 3 | yearl;
    if (year== 127) {
        year = "X";
    } else {
        let y100 = (0b00000000000000000110000000000000 & datebytes) >> 13;
        year = 1900 + 100 * y100 + year;
        year = year.toString().padStart(4, "0");
    }
    return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":00Z";
}

function date_format(cp16) {
    // CA 29
    // EN13757-3:2013, Annex A, data type G
    // 1st byte is bit7..bit0, 2nd byte is bit 16..bit8
    // -> 29 CA -> 0010 1001 1100 1010
    // 1-5 day, 0 = *
    // 9-12 month, 15=*
    // 13-16+6-8 year, 127=*
    let datebytes = (0b0000000011111111 & cp16[0]) | ((0b0000000011111111 & cp16[1]) << 8);
    let day = (0b0000000000011111 & datebytes);
    if (day == 0) {
        day = "X";
    } else {
        day = day.toString().padStart(2, "0");
    }
    let month = (0b0000111100000000 & datebytes) >> 8;
    if (month == 15) {
        month = "X";
    } else {
        month = month.toString().padStart(2, "0");
    }
    let yearl = (0b0000000011100000 & datebytes) >> 5;
    let yearh = (0b1111000000000000 & datebytes) >> 9;
    let year = yearh | yearl;
    if (year <= 80) {
      year += 2000;
    } else {
      year += 1900;
    }
    return year.toString() + "-" + month + "-" + day;
}

function sp1_day_value(byteArray) {
    // https://iot-shop.de/web/image/44371?unique=7238472b6f1804cf6e1c39b3d9fc1d1a32005305
//console.log("sp1_day_value byteArray is ",typeof byteArray);
    var day_values = {
        0x0200: "Battery end of life",
        0x0800: "Smoke chamber pollution prewarning",
        0x1000: "Smoke chamber pollution warning",
        0x2000: "Test button failure",
        0x4000: "Acoustic alarm failure",
        0x8000: "Removal detection",
        0x0001: "Test alarm",
        0x0002: "Smoke alarm",
        0x0004: "Obstruction detection",
        0x0008: "Surrounding area monitoring",
        0x0010: "LED failure",
    };
    let day_status = byteArray[1] << 8 | byteArray[0];
    let day_status_txt = [];
    for([key, val] of Object.entries(day_values)) {
        if (day_status & key) {
            day_status_txt.push(val);
        }
    }
    return day_status_txt.join(", ");
}

function ap1_status(code, data) {
    var status_codes = {
        0x01: "tamper",
        0x02: "removal",
    };
    var text = "";
    switch (code) {
        case 0x02:
            text = date_format(data.slice(1, 3));
            break;
    }
    return [status_codes[code], text];
}

function Lorapacket(bytes) {
    this.bytes = bytes;
    this.pointer = 0;
}

Lorapacket.prototype.shuft = function(number) {
    let retarray = []
    let now_pointer = this.pointer;
    //console.log("now_pointer ", now_pointer, " this.pointer ", this.pointer, " number ", number);
    if (number < 1) {
        if (Number.isInteger(now_pointer)) {
            // left nibble
            this.pointer += number;
            return this.bytes[now_pointer] >> 4 & 0x0f;
        } else {
            // right nibble
            this.pointer += number;
            return this.bytes[now_pointer - number] & 0x0f;
        }
    } else if (number == 1) {
        this.pointer += number;
        return this.bytes[now_pointer];
    } else {
        this.pointer += number;
        return this.bytes.slice(now_pointer, now_pointer + number);
    }
}

function main() {
    let debug = false;
    if (process.env.DEBUG == "1") debug = true;
    const myArgs = process.argv.slice(2);
    if (debug) console.log('payload: ', myArgs[0]);
    let buff = Buffer.from(myArgs[0], 'base64');
    let text = buff.toString('hex');
    let arr = view = new Array(buff.length);
    for (let i = 0; i < buff.length; ++i) {
        arr[i] = buff[i];
    }
    let readable = ""
    for (let i = 0; i < text.length; i += 2) {
      readable += text.charAt(i);
      readable += text.charAt(i+1);
      readable += " "
    }
    if (debug) console.log('hex payload: ', readable);
    let obj = Decoder(arr, 1);
    if (debug)console.log('decoded: ', JSON.stringify(obj, null, 4));
}

if (require.main === module) {
  main();
}
                     
