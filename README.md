# Brax Glass

# Simple glass:

```html
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
  ...
    <!-- Only add a div with a unique ID. -->
    <div id='brax-glass-blonde'></div>
  ...
    <script>
      // The options that will be used for the glass.
      const options = {
        glassId: 'brax-glass-blonde',   // Required. this is the unique ID that you used as a the ID for the DIV in the html.
        foamThickness: 0.3,             // Optional. Thickness of the foam, in percentage relative to fillPercentage.
        fillPercentage: 0.6               // Required. Initial fill percentage.
      };

      // Creating the actual glass.
      const glass = new Glass(options);

      // Fill the glass halfway.
      glass.setFillPercentage(0.5);
    </script>
  </body>
</html>
```

# Timed glass:

```html
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
  ...
    <!-- Only add a div with a unique ID. -->
    <div id='brax-glass-blonde'></div>
  ...
    <script>
      // The options that will be used for the glass.
      const options = {
        glassId: 'brax-glass-blonde',         // Required. this is the unique ID that you used as a the ID for the DIV in the html.
        foamThickness: 0.3,                   // Optional. Thickness of the foam, in percentage relative to fillPercentage.
        start: '2019-01-01T00:00:00.000Z',    // Required. Start date, when the glass is full.
        end: '2019-12-31T23:59:59.9992',      // Required. End date, when the glass will be empty.
        max: 0.8,                             // Optional. Max fill percentage of glass. Glass will never be filled more than this percentage.
        min: 0.4                              // Optional. Min fill percentage of glass. Glass will never be filled less than this percentage
      };

      // Creating the actual glass. This glass will empty itself over the course of the start date until the end date.
      const glass = new Glass(options);
    </script>
  </body>
</html>
```