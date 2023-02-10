{
  description = "TF2 Trading bot Nix Flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    yarn2nix = {
      url = "github:nix-community/yarn2nix";
      flake = false;
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs@{ self, nixpkgs, flake-utils, ... }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
      yarn2nix = import inputs.yarn2nix {inherit pkgs;};
      builtProject = yarn2nix.mkYarnPackage {
        name = "tf2_trader_bot";
        src = ./.;
        packageJSON = ./package.json;
        yarnLock = ./yarn.lock;
        # NOTE: this is optional and generated dynamically if omitted
        # yarnNix = ./yarn.nix;
      };

    in {
      devShell = pkgs.mkShell rec {
        buildInputs = with pkgs; [
          nodejs-18_x
          yarn
          jq
        ];
        # For proper yarnv2 intergration, you'll need to run the steps listed here;
        # <https://github.com/stephank/yarn-plugin-nixify>
        # This is a temporary workaround until nixpkgs ship v2 by default.
        shellHook = ''
          export PATH="$PWD/node_modules/.bin/:$PATH"
          alias scripts='jq ".scripts" package.json'
      		alias run=yarn run'
          alias g='git' \
              ga='g add' \
              gl='g pull' \
              gf='g fetch' \
              gp='g push' \
              gst='g status' \
              gcm='g commit -m' \
              gcmsg='g add -A; g commit -am'
        '';
      };

      packages.tf2_trader_bot = builtProject;
      packages.default = self.packages.${system}.tf2_trader_bot;
    }
  );
}
