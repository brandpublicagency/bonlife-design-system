# Add CMYK codes to Bonlife colours

## What changes
- Every colour swatch on **Foundations** and **Downloads** shows its CMYK value under the hex, with a click-to-copy option.
- Values (calculated from hex, to be confirmed by the printer):

| Colour | Hex | CMYK |
|---|---|---|
| Navy 900 | #0C1C3E | 81 55 0 76 |
| Coral 500 | #FF876A | 0 47 58 0 |
| Mint 400 | #01FBC0 | 100 0 24 2 |
| Funeral Cover | #04413F | 94 0 3 75 |
| Life Insurance | #541467 | 18 81 0 60 |
| Saving & Study Plans | #0D2B90 | 91 70 0 44 |
| Accident & Disability Cover | #A80A4D | 0 94 54 34 |
| Error | #FF5F5F | 0 63 63 0 |
| Success | #41FFB6 | 75 0 29 0 |
| Surface tint | #F7F8FB | 2 1 0 2 |
| Surface muted | #EAEDF4 | 4 3 0 4 |
| Border hairline | #E1E4E9 | 3 2 0 9 |
| Gray 600 | #5B6472 | 20 12 0 55 |

- A short note: "Calculated values - request a printed proof for Mint and Success, which are brighter than print can reproduce."
- CMYK is editable via the admin/assistant connector like other content, and included in the brand summary tool.

## Technical
- Add optional `cmyk` field to the Swatch type in `src/content/site/foundations.ts` and `downloads.ts`; render in the swatch components; add to `get-brand-guidelines` output.
