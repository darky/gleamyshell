import child_process from "node:child_process"
import process from "node:process"
import { default as operating_system } from "node:os"
import { Ok, Error } from "./gleam.mjs"
import { Some, None, is_some, unwrap } from "../gleam_stdlib/gleam/option.mjs"

export function execute(command, args, workingDirectory) {
    const options = is_some(workingDirectory) ? { cwd: unwrap(workingDirectory) } : {}

    let result = {}

    try {
        result = child_process.spawnSync(command, args.toArray(), options)
    } catch {}

    return toResult(result)
}

export function cwd() {
    try {
        return new Some(process.cwd())
    } catch {
        return new None()
    }
}

export function os() {
    const operatingSystem = process.platform

    return operatingSystem === "win32" ? [operatingSystem, ""] : ["unix", operatingSystem]
}

export function home_directory() {
    try {
        return new Some(operating_system.homedir())
    } catch {
        return new None()
    }
}

function toResult(result) {
    if (result?.status === 0) {
        return new Ok(result.stdout?.toString() ?? "")
    }

    return result?.status == null
        ? new Error([result.error?.code ?? "", new None()])
        : new Error([result.stderr?.toString() ?? "", new Some(result.status)])
}
