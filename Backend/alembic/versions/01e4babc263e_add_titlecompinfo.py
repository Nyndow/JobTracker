"""add titleCompInfo

Revision ID: 01e4babc263e
Revises: a1694556c1c3
Create Date: 2025-10-01 15:16:12.190039

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '01e4babc263e'
down_revision: Union[str, Sequence[str], None] = 'a1694556c1c3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
