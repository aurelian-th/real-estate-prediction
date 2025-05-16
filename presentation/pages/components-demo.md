# Interactive Components Demo

This slide shows how to use the custom components in your presentation.

## Property Counter

<PropertyCounter initial="5" :min="0" :max="10" />

## District Price Comparison

<BarChart :data="[
  { label: 'Botanica', value: 65 },
  { label: 'Centru', value: 85 },
  { label: 'Ciocana', value: 58 },
  { label: 'Râșcani', value: 70 },
  { label: 'Telecentru', value: 75 }
]" caption="Average price per m² (% of maximum)" />

---

# How to Use Components

```html
<!-- PropertyCounter component -->
<PropertyCounter initial="5" :min="0" :max="10" />

<!-- BarChart component -->
<BarChart :data="[
  { label: 'Botanica', value: 65 },
  { label: 'Centru', value: 85 },
  { label: 'Ciocana', value: 58 },
  { label: 'Râșcani', value: 70 },
  { label: 'Telecentru', value: 75 }
]" caption="Average price per m² (% of maximum)" />
```
