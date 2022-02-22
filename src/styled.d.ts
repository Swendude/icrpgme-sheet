// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    borderWidth: string;
    fontSize: string;
    colors: {
      main: string;
      secondary: string;
      background: string;
      positive_change: string;
      negative_change: string;
    };
  }
}
