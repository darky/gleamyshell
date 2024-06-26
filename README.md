# GleamyShell

GleamyShell is a cross-platform Gleam library for executing shell commands that supports multiple targets (Erlang, Deno,
and Node.js).

## When to use GleamyShell?

GleamyShell provides the ability to execute shell commands on multiple targets. While this might sound amazing,
supporting targets with fundamentally different concurrency models and APIs shrinks the common ground significantly.

In order to keep the public API homogenous across different targets, GleamyShell only provides synchronous bindings and
a minimal API with common functionalities supported by those targets.

You should use GleamyShell if

-   you need or want to support multiple targets _and/or_
-   synchronous shell command execution is not a concern _and/or_
-   you don't have special use cases that GleamyShell's API cannot serve.

## Usage

### Getting the current username

```gleam
let result = gleamyshell.execute("whoami", [])

case result {
  Ok(username) ->
    io.println("Hello there, " <> string.trim(username) <> "!")
  Error(Failure(output, exit_code)) ->
    io.println(
      "Whoops!\nError ("
      <> int.to_string(exit_code)
      <> "): "
      <> string.trim(output),
    )
  Error(Abort(_)) -> io.println("Something went terribly wrong.")
}
```

### Getting the current working directory

```gleam
case gleamyshell.cwd() {
  Some(working_directory) ->
    io.println("Current working directory: " <> working_directory)
  None ->
    io.println("Couldn't detect the current working directory.")
}
```

## Changelog

Take a look at the [changelog](https://github.com/patrik-kuehl/gleamyshell/blob/main/CHANGELOG.md) to get an overview of
each release and its changes.

## Contribution Guidelines

More information can be found [here](https://github.com/patrik-kuehl/gleamyshell/blob/main/CONTRIBUTING.md).

## License

GleamyShell is licensed under the [MIT license](https://github.com/patrik-kuehl/gleamyshell/blob/main/LICENSE.md).
